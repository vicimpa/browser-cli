import { env } from "env";
import { useEvent } from "library/useEvent";
import { FC, useEffect, useState } from "react";

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
  const [preInput] = useState(`vic@host ~ `);
  const [input, setInput] = useState('');
  const [commands, setCommands] = useState([] as { name: string; description: string; }[]);
  const [select, setSelect] = useState(undefined as number | undefined);
  const showComplate = typeof select == 'number' || (!!input.trim() && input.trim().split(/\s+/).length == 1);
  const showInput = typeof select == 'undefined' ? input : commands[select]?.name || input;
  const showDescription = commands.length > 0 && typeof select == 'number';
  const filterSelect = commands
    .map(({ name }, index) => ({ name, index }))
    .filter(e => e.name.indexOf(input) == 0);

  useEffect(() => {
    env().then(e => setCommands(e.commands as any));
  }, []);

  useEffect(() => {
    setSelect(undefined);
  }, [input]);

  useEvent('keydown', (e) => {
    e.preventDefault();

    const { key, code } = e;

    if (false
      || (e.ctrlKey && key == 'l')
      || (e.metaKey && key == 'l')
    ) {
      context.clear();
      return;
    }

    switch (key) {
      case 'Backspace': {
        setInput(v => {
          const l = (v != showInput ? showInput : v);
          return l.substr(0, l.length - 1);
        });
      } break;

      case 'Tab': {
        setSelect(select => {
          if (!filterSelect.length)
            return undefined;

          if (typeof select == undefined)
            return 0;

          const index = filterSelect.findIndex(e => e.index == select);

          if (filterSelect[index + 1])
            return filterSelect[index + 1].index;

          return filterSelect[0].index;
        });
      } break;

      case 'Enter': {
        onSubmit((input != showInput ? showInput : input), preInput);
        setInput('');
      } break;

      default: {
        if (key.length == 1)
          setInput(v => (input != showInput ? showInput : v) + key);
        else
          console.log(key, code);
      };
    }
  });

  return (
    <>
      <pre className={styles.root}>
        {preInput + showInput}
        {showDescription ? (
          ` (${commands[select].description})\n`
        ) : <Cursor />}
      </pre>
      {showComplate ? (
        <pre>
          {filterSelect.map((e) => {
            if (e.index == select)
              return `[-${e.name}-]`;
            else
              return `  ${e.name}  `;
          }).join(' ')}
        </pre>
      ) : null}
    </>
  );
};