import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: '1',

    slug: 'evolution',

    category: 'Science & Faith',

    question: 'Can Catholics believe in evolution?',

    answer:
      'Yes. Catholics may accept evolution provided that God remains the creator and the human soul is directly created by God.',

    explanation:
      'The Church allows scientific investigation into evolution. Catholics are free to accept evolutionary theory so long as they affirm divine creation and the spiritual nature of the soul.',

    catechism: {
      paragraphs: ['283', '284'],
      text: 'The question about the origins of the world and man has been the object of many scientific studies.',
    },

    scripture: {
      reference: 'Genesis 1:1',
      text: 'In the beginning God created the heavens and the earth.',
    },
  },
  {
    id: '2',

    slug: 'ivf',

    category: 'Science & Faith',

    question: 'Can Catholics believe in IVF?',

    answer:
      'Yes. Catholics may accept IVF provided that it does not involve the destruction of embryos and that it respects the dignity of human life.',

    explanation:
      'The Church allows scientific investigation into evolution. Catholics are free to accept evolutionary theory so long as they affirm divine creation and the spiritual nature of the soul.',

    catechism: {
      paragraphs: ['283', '284'],
      text: 'The question about the origins of the world and man has been the object of many scientific studies.',
    },

    scripture: {
      reference: 'Genesis 1:1',
      text: 'In the beginning God created the heavens and the earth.',
    },
  },
];
