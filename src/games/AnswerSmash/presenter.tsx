import { styled } from "styled-components";
import { SpinDiamond } from "../../components/SpinDiamond";

export const ImageDiamond = styled(SpinDiamond)`
  height: 325px;
  width: 325px;
  overflow: hidden;

  border: 2px solid #01b0cd;
  outline: 2px solid #1a1a1a;

  > div {
    inset: -20%;
  }
`;

export const ImageClue = styled.div<{ $src: string }>`
  display: block;
  width: 100%;
  height: 100%;

  background-image: url(${({ $src }) => `/answersmash/${$src}`});
  background-position: center;
  background-size: cover;
`;
