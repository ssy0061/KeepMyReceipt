/** 숫자를 입력받으면 원화 단위로 만들어서 반환하는 함수 */
export default function toCurrency(value: number) {
  return String(value)
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .concat('원');
}
