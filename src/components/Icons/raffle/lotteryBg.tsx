import React from 'react';

interface MobileLotteryBorderProps {
  width: number;
  height: number;
  borderWidth?: number;
}

const MobileLotteryBorder: React.FC<MobileLotteryBorderProps> = ({
  width,
  height,
  borderWidth = 5,
}) => {
  // 角的参数，和原SVG一致
  const inset = 2.5;
  const c1 = 4.95;
  const c2 = 7.14;
  const c3 = 8.84;
  const c4 = 10.54;
  const c5 = 11.75;
  const c6 = 12.25;

  // 右上角起点
  const x1 = width - c6;
  const y1 = inset;
  // 右下角
  const x2 = width - inset;
  const y2 = height - c6;
  // 左下角
  const x3 = c6;
  const y3 = height - inset;
  // 左上角
  const x4 = inset;
  const y4 = c6;

  // 动态生成path
  const d = `
    M${x1},${y1}
    C${x1 + 0.5},${y1 + c1} ${x1 + 1.71},${y1 + c2} ${x1 + 3.41},${y1 + c3}
    C${x1 + 5.12},${y1 + c4} ${x1 + 7.3},${y1 + c5} ${x1 + 9.75},${y1 + c6}
    L${x2},${y2}
    C${x2 - 2.45},${y2 + 0.5} ${x2 - 4.63},${y2 + 1.71} ${x2 - 6.34},${
    y2 + 3.41
  }
    C${x2 - 8.05},${y2 + 5.12} ${x2 - 10.23},${y2 + 7.3} ${x2 - 12.75},${
    y2 + 9.75
  }
    L${x3},${y3}
    C${x3 - 0.5},${y3 - c1} ${x3 - 1.71},${y3 - c2} ${x3 - 3.41},${y3 - c3}
    C${x3 - 5.12},${y3 - c4} ${x3 - 7.3},${y3 - c5} ${x3 - 9.75},${y3 - c6}
    L${x4},${y4}
    C${x4 + 2.45},${y4 - 0.5} ${x4 + 4.63},${y4 - 1.71} ${x4 + 6.34},${
    y4 - 3.41
  }
    C${x4 + 8.05},${y4 - 5.12} ${x4 + 10.23},${y4 - 7.3} ${x4 + 12.75},${
    y4 - 9.75
  }
    Z
  `;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="lottery-bg"
    >
      <defs>
        <linearGradient
          id="border-gradient"
          x1="73.7975084%"
          y1="113.768982%"
          x2="2.23078547%"
          y2="-20.7930057%"
        >
          <stop stopColor="#FE932F" offset="0%" />
          <stop stopColor="#FDB067" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d={d}
        stroke="url(#border-gradient)"
        strokeWidth={borderWidth}
        fill="none"
      />
    </svg>
  );
};

export default MobileLotteryBorder;
