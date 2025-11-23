/* eslint-disable @typescript-eslint/no-explicit-any */

import {DebouncedState, useDebouncedCallback} from 'use-debounce'
import {useConfigurationStore} from '../store'
import {useShallow} from 'zustand/shallow'

export default function useCommit<F extends (...args: any[]) => any>(
	func: F,
	milliseconds: number = 500
): DebouncedState<F> {
	const {live, commit} = useConfigurationStore(
		useShallow((state) => ({live: state.live, commit: state.commit}))
	)

	const debouncedFunc = useDebouncedCallback(
		(...args: Parameters<F>): ReturnType<F> => {
			const value = func(...args)
			if (live) {
				commit()
			}
			return value
		},
		milliseconds
	)

	return debouncedFunc
}
