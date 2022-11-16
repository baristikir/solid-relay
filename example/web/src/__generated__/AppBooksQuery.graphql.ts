/**
 * @generated SignedSource<<a4a0d07fb877cb7afcd298b14289e5ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppBooksQuery$variables = {};
export type AppBooksQuery$data = {
  readonly books: ReadonlyArray<{
    readonly title: string;
  }>;
};
export type AppBooksQuery = {
  response: AppBooksQuery$data;
  variables: AppBooksQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Book",
    "kind": "LinkedField",
    "name": "books",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppBooksQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppBooksQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "366abb6eabe58e2b82dea6961a8cbb92",
    "id": null,
    "metadata": {},
    "name": "AppBooksQuery",
    "operationKind": "query",
    "text": "query AppBooksQuery {\n  books {\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "a22a255642aeeeba306ec16900370353";

export default node;
