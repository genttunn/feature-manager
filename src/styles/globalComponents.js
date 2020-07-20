import React from "react";
import globalStyles from "./globalStyles";
const globalComponents = (
  <style type="text/css">
    {`
    .btn-nord-pink {
      background-color: ${globalStyles.aurora5};
      color: ${globalStyles.night1};
    }
    .btn-nord-green {
      background-color: ${globalStyles.aurora4};
      color: ${globalStyles.night1};
    }
    .btn-nord-yellow {
      background-color: ${globalStyles.aurora3};
      color: ${globalStyles.night1};
    }
    .btn-nord-orange {
      background-color: ${globalStyles.aurora2};
      color: ${globalStyles.night1};
    }
    .btn-nord-red {
      background-color: ${globalStyles.aurora1};
      color: ${globalStyles.snow3};
    }
    .btn-nord-navy {
      background-color: ${globalStyles.frost4};
      color: ${globalStyles.snow3};
    }
    .btn-nord-cotton {
      background-color: ${globalStyles.frost3};
      color: ${globalStyles.night1};
    }
    .btn-nord-robin {
      background-color: ${globalStyles.frost2};
      color: ${globalStyles.night1};
    }
    .btn-nord-jade {
      background-color: ${globalStyles.frost1};
      color: ${globalStyles.night1};
    }
    .btn-nord-snow {
      background-color: ${globalStyles.snow2};
      color: ${globalStyles.night1};
      border-color: ${globalStyles.night2};
    }
    `}
  </style>
);

export default globalComponents;
