import { CSSProperties } from "react";
import classNames from "classnames";

type ViewProps = {
  children?: React.ReactNode[] | React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

export const View = (props: ViewProps) => {
  const { children, className, as, style, onClick } = props;
  const Component = as || "div";

  const componentClass = classNames("default-class", className);

  return (
    <Component className={componentClass} style={style} onClick={onClick}>
      {children}
    </Component>
  );
};
