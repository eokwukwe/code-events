import { createReducer } from '../../app/common/util/reducerUtils';
import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';

const initialState = null;

const openModal = (state, payload) => ({
	modalType: payload.modalType,
	modalProps: payload.modalProps,
});

const closeModal = state => null;

export default createReducer(initialState, {
	[MODAL_OPEN]: openModal,
	[MODAL_CLOSE]: closeModal,
});
