import * as S from "./styles";

interface Props {
    width: string
    height: string
}

const Loading = ({ width, height}: Props) => {
    return (
        <S.SpinnerWrapper data-testid="loading">
        <S.SpinnerSVG width={width} height={height} viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="31.415, 31.415"
            fill="none"
            strokeDashoffset="0"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </S.SpinnerSVG>
      </S.SpinnerWrapper>
    )
}

export default Loading;
