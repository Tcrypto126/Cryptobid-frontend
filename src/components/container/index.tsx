import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"div">{};

const Container: FC<Props> = (props) => {
  return (
    <div className={cn("container w-full max-w-[1440px] mx-auto px-4", props.className)}>
      {props.children}
    </div>
  );
};

export default Container;