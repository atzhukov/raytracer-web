/**
 * The state of the canvas component.
 */
export type State = {
	imageData: ImageData | null
	errorMessage: string | null
	state: 'empty' | 'working' | 'error' | 'done'
}

/**
 * A transition that represents a state change.
 */
type Transition =
	| EmptyTransition
	| WorkingTransition
	| ErrorTransition
	| DoneTransition

type EmptyTransition = {to: 'empty'}
type WorkingTransition = {to: 'working'}
type ErrorTransition = {to: 'error'; message: string}
type DoneTransition = {to: 'done'; imageData: ImageData}

// MARK: - State Machine

/**
 * A state transition function for the canvas component.
 * @param state the current state.
 * @param transition the transition to apply.
 * @returns a new state according to the transition, or the same state if `transition` is invalid.
 */
export default function progress(state: State, transition: Transition): State {
	if (transitionIsEmpty(transition)) {
		return {
			imageData: null,
			errorMessage: null,
			state: 'empty',
		}
	} else if (transitionIsWorking(transition)) {
		return {
			imageData: state.imageData,
			errorMessage: null,
			state: 'working',
		}
	} else if (transitionIsError(transition)) {
		return {
			imageData: state.imageData,
			errorMessage: transition.message,
			state: 'error',
		}
	} else if (transitionIsDone(transition)) {
		return {
			imageData: transition.imageData,
			errorMessage: null,
			state: 'done',
		}
	} else {
		return state
	}
}

// MARK: - Type Guards

function transitionIsEmpty(
	transition: Transition
): transition is EmptyTransition {
	return transition.to == 'empty'
}

function transitionIsWorking(
	transition: Transition
): transition is WorkingTransition {
	return transition.to == 'working'
}

function transitionIsError(
	transition: Transition
): transition is ErrorTransition {
	return transition.to == 'error'
}

function transitionIsDone(
	transition: Transition
): transition is DoneTransition {
	return transition.to == 'done'
}
