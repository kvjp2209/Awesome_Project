import * as React from 'react';

let ready = false;

export function setReady(value) {
  ready = !!value;
}

export function isNavigationReady() {
  return ready;
}

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();
