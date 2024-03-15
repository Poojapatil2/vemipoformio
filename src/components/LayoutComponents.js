const layoutComponents = {
  label: {
    title: 'Label',
    group: 'custom',
    icon: 'fa-solid fa-tag',
    schema: {
      type: 'htmlelement',
      key: 'label',
      tag: 'label',
      content: '',
      attrs: [
        {
          attr: '',
          value: '',
        },
      ],
    },
  },
  separator: {
    title: 'Separator',
    group: 'custom',
    icon: 'fa-solid fa-tag',
    schema: {
      type: 'htmlelement',
      key: 'label',
      tag: 'hr',
      content: '',
      attrs: [],
    },
  },
  paragraph:
  {
    title: 'Paragraph',
    group: 'custom',
    icon: 'fa-solid fa-paragraph',
    schema: {
      type: 'content',
      key: 'paragraph',
      input: true
    },
  },
  columns:
  {
    title: 'Columns',
    group: 'custom',
    icon: 'fa-solid fa-columns',
    schema: {
      type: 'columns',
      key: 'columns',
    },
  },
  table:
  {
    title: 'Table',
    group: 'custom',
    icon: 'fa-solid fa-table',
    schema: {
      type: 'table',
      key: 'table',
    },
  },
  panel:
  {
    title: 'Panel',
    group: 'custom',
    icon: 'fa-solid fa-window-maximize',
    schema: {
      type: 'panel',
      key: 'panel',
    },
  },
};

export default layoutComponents;
