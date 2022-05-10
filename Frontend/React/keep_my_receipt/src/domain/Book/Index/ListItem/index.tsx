import { Stack, Typography } from '@mui/material';
import toCurrency from '../../../../services/toCurrency';

interface ItemType {
  name: string;
  amount: number;
}

export default function ListItem({ items }: { items: ItemType[] }) {
  return (
    <>
      {items.map((item) => (
        // 양쪽 정렬
        <Stack
          direction="row"
          justifyContent="space-between"
          marginY={2}
          key={item.name}
        >
          <Stack>
            {/* 거래내역 이름 */}
            <Typography>{item.name}</Typography>
            {/* 거래내역 태그? */}
            <Typography variant="subtitle2">결제</Typography>
          </Stack>

          {/* 거래내역 금액 */}
          <Typography>{toCurrency(item.amount)}</Typography>
        </Stack>
      ))}
    </>
  );
}
