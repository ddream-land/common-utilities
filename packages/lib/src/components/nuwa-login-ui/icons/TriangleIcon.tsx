
const TriangleIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="10" height="8" viewBox="0 0 10 8"
      fill="none"
    >
    < path fillRule="evenodd" clipRule="evenodd" d="M5.81923 7.07972L9.14858 2.32352C9.46529 1.87107 9.35526 1.24754 8.90281 0.930823C8.73472 0.813165 8.53452 0.750055 8.32934 0.750055H1.67065C1.11837 0.750055 0.670654 1.19777 0.670654 1.75006C0.670654 1.95523 0.733764 2.15543 0.851422 2.32352L4.18077 7.07972C4.49748 7.53217 5.12101 7.64221 5.57346 7.32549C5.6691 7.25854 5.75228 7.17537 5.81923 7.07972Z" fill="#EEEEEE"/>
    </svg>
  );
};

export default TriangleIcon;