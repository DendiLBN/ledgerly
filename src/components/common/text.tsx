import { ReactNode } from "react";
import classNames from "classnames";

const textVariants = {
  h1: {
    component: "h1",
    className: "text-3xl font-bold",
  },
  h2: {
    component: "h2",
    className: "text-2xl",
  },
  h3: {
    component: "h3",
    className: "text-xl",
  },
  h4: {
    component: "h4",
    className: "text-base",
  },
  button: {
    component: "span",
    className: "text-base",
  },
  label: {
    component: "span",
    className: "text-base",
  },
  title: {
    component: "h3",
    className: "text-base",
  },
  caption: {
    component: "p",
    className: "text-base",
  },
  body: {
    component: "p",
    className: "text-base",
  },
  bodyMedium: {
    component: "p",
    className: "text-base",
  },
  special: {
    component: "p",
    className: "text-base",
  },
  input: {
    component: "span",
    className: "text-base",
  },
  marker: {
    component: "span",
    className: "text-base",
  },
  filter: {
    component: "p",
    className: "text-base",
  },
};

type TextProps = {
  variant?: keyof typeof textVariants;
  children?: string | ReactNode;
  className?: string;
};

export const Text = ({
  variant = "body",
  className: additionalClassNames,
  children,
}: TextProps) => {
  const Component = textVariants[`${variant}`]
    .component as keyof JSX.IntrinsicElements;

  return (
    <Component
      className={classNames(
        textVariants[variant].className,
        additionalClassNames
      )}
    >
      {children}
    </Component>
  );
};
