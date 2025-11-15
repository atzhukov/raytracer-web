import {useConfigurationStore} from '@/lib/store'

/** A manager that handles ray tracing web workers. */
class WorkerManager {
	/** The worker that is currently operating */
	private worker: Worker | null = null

	/**
	 * Creates a new ray tracing worker, ensuring that the previous one, if any, is terminated.
	 * @returns a new worker instance.
	 */
	createNew(): Worker {
		// Ensure the previous one is terminated before creating a new one.
		this.terminate()

		const worker = new Worker(new URL('./worker.ts', import.meta.url))
		this.worker = worker
		return worker
	}

	/** Notifies the manager that the worker has finished. */
	finished(): void {
		this.worker = null
	}

	/** Terminates the currently operating worker, if any. */
	terminate(): void {
		if (this.worker) {
			console.log('worker manager: terminating worker')
			this.worker.terminate()
		}
		this.worker = null
	}
}

// Also make sure we terminate the worker whenever state changes,
// so we don't render unexpected pictures (for example, when quickly removing objects)
useConfigurationStore.subscribe(() => {
	workerManager.terminate()
})

export const workerManager = new WorkerManager()
