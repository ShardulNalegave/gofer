
interface SpacerProps {
  span?: boolean,
  width?: number,
  height?: number,
};

export default function Spacer({
  width = 0,
  height = 0,
  span = false,
}: SpacerProps) {
  return (
    <div
      style={{
        width,
        height,
        display: span ? 'inline-block' : 'block',
      }}
    ></div>
  );
}
