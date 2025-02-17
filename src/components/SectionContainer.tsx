
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, FC } from "react";

interface Props extends ComponentPropsWithoutRef<"section">{};

const Section: FC<Props> = (props) => {
  return (
    <section {...props} className={cn("py-28 px-4", props.className)}>
      {props.children}
    </section>
  );
};

export default Section;