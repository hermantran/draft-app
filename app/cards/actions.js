import * as types from './actionTypes';
import { push } from 'react-router-redux';
import { readDraftFile, pickCount, packCount } from '../middleware/draftReader';

export function uploadDraft(files) {
  if (!files.length) {
    return viewDraft();
  }

  return (dispatch) => {
    return readDraftFile(files[0])
    .then(cards => dispatch(viewDraft(cards)))
    .then(() => dispatch(push('/draft')));
  };
}

export function viewDraft(cards = []) {
  return {
    type: types.UPLOAD,
    payload: {
      cards,
      pickCount,
      packCount
    }
  };
}

export function viewPreviousPicks() {
  return {
    type: types.VIEW_PREVIOUS
  };
}

export function viewNextPicks() {
  return {
    type: types.VIEW_NEXT
  };
}

export function viewPackPick(pack, pick) {
  return {
    type: types.VIEW_PACK_PICK,
    payload: {
      pack,
      pick
    }
  };
}

export function toggleSelected() {
  return {
    type: types.TOGGLE_SELECTED
  };
}

export function toggleReserved() {
  return {
    type: types.TOGGLE_RESERVED
  };
}

export function toggleMissing() {
  return {
    type: types.TOGGLE_MISSING
  };
}