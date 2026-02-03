import { Form, Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status }: Props) {
    // Inertia form
    const form = useForm({
        username: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/login', {
            onSuccess: () => form.reset('password'),
        });
    };

    return (
        <AuthLayout title="" description="">
            <Head title="Log in" />

            <Card className="w-full max-w-xl">
                <CardHeader className="text-center space-y-6">
                    <div className="flex justify-center items-center gap-6 mb-6">
                        <img src="/images/jrrmc_logo.svg" alt="Jose Reyes Memorial Medical Center Logo" className="h-20 w-auto object-contain" />
                        <img src="/images/bp_logo.png" alt="Bagong Pilipinas Logo" className="h-20 w-auto object-contain" />
                        <img src="/images/doh_logo.svg" alt="Department of Health Logo" className="h-20 w-auto object-contain" />
                    </div>
                    <CardTitle className="text-2xl">Log in to your account</CardTitle>
                    <CardDescription className="text-base">Enter your Username and password to log in</CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="username" className="text-base">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="Username"
                                    value={form.data.username}
                                    onChange={(e) => form.setData('username', e.target.value)}
                                    className="h-11 text-base"
                                />
                                <InputError message={form.errors.username} />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password" className="text-base">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={form.data.password}
                                    onChange={(e) => form.setData('password', e.target.value)}
                                    className="h-11 text-base"
                                />
                                <InputError message={form.errors.password} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full h-12 text-base"
                                tabIndex={4}
                                disabled={form.processing}
                                data-test="login-button"
                            >
                                {form.processing && <Spinner />}
                                Log in
                            </Button>
                        </div>
                    </form>

                    {status && (
                        <div className="mt-4 text-center text-base font-medium text-green-600">
                            {status}
                        </div>
                    )}
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
