"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import { View } from "@/components/common/view";
import { Text } from "@/components/common/text";
import { SubmitButton } from "@/components/SubmitButton";
import { SignInIcon } from "@/components/Icons/singup-icon";
import Link from "next/link";
import { GoogleLogo } from "@/components/Icons/google-logo";

export default function SignInPage() {
  return (
    <View className="flex flex-col justify-center items-center min-h-screen text-center gap-6 max-w-5xl mx-auto">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8"
        >
          <View as="header" className="text-center">
            <SignInIcon />
            <Text className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
              Sign in to Ledgerly
            </Text>
          </View>
          <Clerk.GlobalError className="block text-sm text-red-600" />
          <Clerk.Field name="identifier">
            <Clerk.Label className="sr-only">Email</Clerk.Label>
            <Clerk.Input
              type="email"
              required
              placeholder="Email"
              className="w-full border-b border-neutral-200 bg-white pb-2 text-sm/6 text-neutral-950 outline-none placeholder:text-neutral-400 hover:border-neutral-300 focus:border-neutral-600 data-[invalid]:border-red-600 data-[invalid]:text-red-600"
            />

            <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="relative w-full rounded-md bg-neutral-600 bg-gradient-to-b from-neutral-500 to-neutral-600 py-1.5 text-sm font-medium text-white shadow-[0_1px_1px_0_theme(colors.white/10%)_inset,0_1px_2.5px_0_theme(colors.black/36%)] outline-none ring-1 ring-inset ring-neutral-600 before:absolute before:inset-0 before:rounded-md before:bg-white/10 before:opacity-0 hover:before:opacity-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:bg-neutral-600 active:text-white/60 active:before:opacity-0"
          >
            Sign In
          </SignIn.Action>
          <View className="rounded-xl bg-neutral-100 p-5">
            <Text className="mb-4 text-center text-sm/5 text-neutral-500">
              Alternatively, sign in with these platforms
            </Text>
            <View className="space-y-2">
              <Clerk.Connection
                name="google"
                className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-b from-white to-neutral-50 px-2 py-1.5 text-sm font-medium text-neutral-950 shadow outline-none ring-1 ring-black/5 hover:to-neutral-100 focus-visible:outline-offset-2 focus-visible:outline-neutral-600 active:text-neutral-950/60"
              >
                <GoogleLogo />
                Login with Google
              </Clerk.Connection>
            </View>
          </View>
          <Text className="text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link
              href={String(process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL)}
              className="rounded px-1 py-0.5 text-neutral-700 outline-none hover:bg-neutral-100 focus-visible:bg-neutral-100"
            >
              Sign up
            </Link>
          </Text>
        </SignIn.Step>
        <SignIn.Step
          name="verifications"
          title="Verify your account"
          className="w-full space-y-6 rounded-2xl px-4 py-10 sm:w-96 sm:px-8"
        >
          <SubmitButton />
        </SignIn.Step>
      </SignIn.Root>
    </View>
  );
}
