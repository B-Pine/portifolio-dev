export default {
  name: 'contact',
  description: 'Open contact.html in the editor.',
  run: () => ({
    type: 'open-tab',
    tab: { id: 'contact', title: 'contact.html', icon: 'mail', kind: 'contact' }
  })
};
