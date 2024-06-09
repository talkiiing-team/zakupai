import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: () => (
        <div className="flex h-full w-full flex-col">
            <main className="flex flex-grow flex-col items-center bg-gradient-to-br from-green-500 to-green-50 text-zinc-800">
                <section className="mb-24 mt-36 flex flex-col items-center">
                    <h1 className="mb-12 text-8xl">
                        <span className="align-middle">РаспределAI</span>
                    </h1>
                    <p className="max-w-96 text-center text-2xl">
                        AI-система для интеллектуальной аналитики и предсказаний
                        распределенных затрат
                    </p>
                </section>
                <section>
                    <button className="flex transform items-center justify-center rounded-xl border border-zinc-300 bg-white px-24 py-3 text-2xl shadow-2xl transition duration-150 hover:scale-110 hover:text-green-500">
                        Начать!
                    </button>
                </section>
            </main>
            <footer className="flex flex-row justify-between border-t border-zinc-300 bg-gradient-to-tr from-zinc-900 to-zinc-500 p-8 text-zinc-100">
                <span>{'Singularity Team w/ <3'}</span>
                <span>2024</span>
            </footer>
        </div>
    ),
});
