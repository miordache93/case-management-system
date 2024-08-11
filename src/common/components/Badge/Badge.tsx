import { Chip, Color } from "@mui/material";


interface BadgeProps {
  text: string;
  color: string;
  backgroundColor: string;
  border?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color, backgroundColor, border }) => (
    <Chip 
      label={text} 
      style={{ 
        color: color,
        backgroundColor: backgroundColor,
        ...(border && { border: border }) || {},
      }}
    />
);

export default Badge;