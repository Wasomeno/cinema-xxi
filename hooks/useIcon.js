import dynamic from "next/dynamic";

export const useIcon = (icon) => {
  const icons = {
    house: dynamic(() => import("../components/Icons/House")),
    globe: dynamic(() => import("../components/Icons/Globe")),
    rectangleStack: dynamic(() => import("../components/Icons/RectangeStack")),
    ticket: dynamic(() => import("../components/Icons/Ticket")),
    time: dynamic(() => import("../components/Icons/Time")),
    cinema: dynamic(() => import("../components/Icons/Cinema")),
    plus: dynamic(() => import("../components/Icons/Plus")),
  };

  return icons[icon];
};
