const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function createApp() {
  const elements = new Map();
  for (const id of ['shots', 'goals', 'saves', 'svp', 'history', 'add-goal', 'opp']) {
    elements.set(id, {
      textContent: '',
      value: '',
      disabled: false,
      replaceChildren() {},
      append() {},
    });
  }
  const storage = new Map();
  const context = {
    document: {
      getElementById: id => elements.get(id),
    },
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key),
    },
    navigator: {},
  };
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  vm.runInNewContext(script, context);
  return { context, elements };
}

test('goals cannot exceed shots', () => {
  const { context, elements } = createApp();

  assert.equal(elements.get('add-goal').disabled, true);
  context.addGoal();
  assert.equal(elements.get('goals').textContent, 0);

  context.addShot();
  assert.equal(elements.get('add-goal').disabled, false);
  context.addGoal();
  assert.equal(elements.get('goals').textContent, 1);
  assert.equal(elements.get('add-goal').disabled, true);

  context.addGoal();
  assert.equal(elements.get('goals').textContent, 1);

  context.addShot();
  assert.equal(elements.get('add-goal').disabled, false);
  context.addGoal();
  assert.equal(elements.get('goals').textContent, 2);
});

test('shots cannot be reduced below the number of goals', () => {
  const { context, elements } = createApp();

  context.addShot();
  context.addGoal();
  context.removeShot();

  assert.equal(elements.get('shots').textContent, 1);
  assert.equal(elements.get('goals').textContent, 1);
});
