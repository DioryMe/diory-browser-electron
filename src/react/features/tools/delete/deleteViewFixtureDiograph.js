export default {
  someDioryId: {
    id: 'someDioryId',
    text: 'someDioryId name',
    links: {
      linkedDioryId1: { id: 'linkedDioryId1' },
      bidirectionalLinkedDioryId3: { id: 'bidirectionalLinkedDioryId3' },
    },
    data: [
      {
        contentUrl: 'some-path',
      },
    ],
  },
  linkedDioryId1: {
    id: 'linkedDioryId1',
    text: 'linkedDioryId1 name',
  },
  reverseLinkedDioryId2: {
    id: 'reverseLinkedDioryId2',
    text: 'reverseLinkedDioryId2 name',
    links: {
      someDioryId: { id: 'someDioryId' },
    },
  },
  bidirectionalLinkedDioryId3: {
    id: 'bidirectionalLinkedDioryId3',
    text: 'bidirectionalLinkedDioryId3 name',
    links: {
      someDioryId: { id: 'someDioryId' },
    },
  },
  dioryWithoutLinks: {
    id: 'dioryWithoutLinks',
    text: 'dioryWithoutLinks name',
    data: [
      {
        contentUrl: 'some-path',
      },
    ],
  },
}
