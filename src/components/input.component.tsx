import { env } from "env";
import { useEvent } from "library/useEvent";
import { FC, useState } from "react";
import { Cursor } from "./cursor.component";

import styles from "./input.module.sass";

interface IInput {
  context: IContext;
  onSubmit?(v: string, p: string): any;
}

export const Input: FC<IInput> = ({
  context,
  onSubmit = () => null
}) => {
  const [preInput] = useState(`${env.user}@${env.host} ~ `);
  const [input, setInput] = useState('');

  useEvent('keydown', (e) => {
    e.preventDefault();

    const { key, code } = e;

    if (e.ctrlKey && key == 'l') {
      context.clear();
      return;
    }

    switch (key) {
      case 'Backspace': {
        setInput(v => v.substr(0, v.length - 1));
      } break;

      case 'Enter': {
        onSubmit(input, preInput);
        setInput('');
      } break;

      default: {
        if (key.length == 1)
          setInput(v => v + key);
        else
          console.log(key, code);
      };
    }
  });

  return (
    <pre className={styles.root}>
      {preInput + input}
      <Cursor />
    </pre>
  );
};