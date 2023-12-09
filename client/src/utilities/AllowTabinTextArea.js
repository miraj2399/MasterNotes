//this function allows the insertion of a tab character ('\t') when the 'Tab' key is pressed in a text input or textarea element. Take e as its parameter keyboard event
export default function AllowTab (e) {
    const { value } = e.target;

    if (e.key === 'Tab') {
      e.preventDefault();

      const cursorPosition = e.target.selectionStart;
      const cursorEndPosition = e.target.selectionEnd;
      const tab = '\t';

      e.target.value =
        value.substring(0, cursorPosition) +
        tab +
        value.substring(cursorEndPosition);

      // if you modify the value programmatically, the cursor is moved
      // to the end of the value, we need to reset it to the correct
      // position again
      e.target.selectionStart = cursorPosition + 1;
      e.target.selectionEnd = cursorPosition + 1;
    }
  }