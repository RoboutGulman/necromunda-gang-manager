export function useFieldChange<T>(
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
): (filedName: keyof T) => any {
  return (filedName: keyof T) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [filedName]: event.target.value,
      });
    };
}
