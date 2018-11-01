const recaman = (time, context) => {
  context.series = context.series || [0];
  context.seriesRef = context.seriesRef || { 0: true };
  if (context.shouldFlip === undefined) {
    context.shouldFlip = true;
  }
  else {
    context.shouldFlip = !context.shouldFlip;
  }

  const lastNum = context.series.slice(-1).pop();
  const index = context.series.length;
  const idealNum = lastNum - index;

  const actualNum = idealNum > 0 && !context.seriesRef[idealNum] ? idealNum : lastNum + index;

  context.series.push(actualNum);
  context.seriesRef[actualNum] = true;

  const { height, shouldFlip } = context;

  const circleRadius = Math.abs((actualNum - lastNum) / 2);

  const angleArgs = shouldFlip ? [Math.PI, 0] : [0, Math.PI];


  return { arc: [(actualNum + lastNum)/2, height / 2, circleRadius, ...angleArgs], time };
};

export default recaman;