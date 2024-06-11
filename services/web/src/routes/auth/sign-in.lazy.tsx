import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/auth/sign-in')({
    component: () => (
        <main className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-50">
            <form className="rounded-xl border border-zinc-300 bg-zinc-50 p-4">
                <h1 className="mb-8 text-2xl">Авторизуйтесь!</h1>
                <fieldset className="flex flex-col">
                    <p>
                        <label>Email</label>
                        <input placeholder="Email"></input>
                    </p>
                    <p>
                        <label>Email</label>
                        <input placeholder="Email"></input>
                    </p>
                    <button>Войти</button>
                </fieldset>
            </form>
        </main>
    ),
});
