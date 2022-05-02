import { Container } from '@mui/material';

import IndexHeader from './Header';
import IndexList from './List';
import useToggle from '../../../hooks/useToggle';

export default function BookIndex() {
  const { toggleValue, ToggleButtons } = useToggle(['목록', '달력']);

  return (
    <Container maxWidth="md">
      {/* 월, 지출, 수입 */}
      <IndexHeader />
      {/* 토글 버튼들 */}
      <ToggleButtons />
      {/* 토글 버튼에 따라 하단 모드 변경 */}
      {toggleValue === '목록' ? <IndexList /> : ''}
    </Container>
  );
}
