import { Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Notice() {
  return (
    <>
      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <CampaignIcon className="icon" />
              <div className="text">공지사항</div>
            </Stack>
            <div className="toggle">
              <ArrowForwardIosIcon color="disabled" />
            </div>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
