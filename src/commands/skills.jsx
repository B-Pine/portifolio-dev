export default {
  name: 'skills',
  description: 'Open skills.ts in the editor.',
  run: () => ({
    type: 'open-tab',
    tab: { id: 'skills', title: 'skills.ts', icon: 'code', kind: 'skills' }
  })
};
