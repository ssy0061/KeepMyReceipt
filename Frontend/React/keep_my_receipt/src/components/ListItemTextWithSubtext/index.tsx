import {
  ListItemText,
  ListItemTextProps,
  Stack,
  Typography,
} from '@mui/material';

interface SubtextType extends ListItemTextProps {
  text: string;
  subtext: string;
  inset?: boolean;
}

export default function ListItemTextWithSubtext(props: SubtextType) {
  return (
    <ListItemText
      primary={
        <Stack direction="row" alignItems="center">
          {/* 분류명 */}
          <Typography display="inline" width="5rem">
            {props.text}
          </Typography>
          {/* 선택된 항목 강조 */}
          <Typography display="inline" fontSize="large" fontWeight="bold">
            {props.subtext}
          </Typography>
        </Stack>
      }
      sx={{ marginLeft: props.inset ? 5 : 0 }}
    />
  );
}
