import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../../actions/auth";

const Sidenav = ({ mobileSideNav, logOut, hideMobileSideNav }) => {
  const onLogOut = () => {
    logOut();
  };

  return (
    <Fragment>
      {mobileSideNav ? (
        <div className="fullscreen-pop-up" onClick={() => hideMobileSideNav()}>
          <aside className="flex aside" onClick={e => e.stopPropagation()}>
            <div className="flex-vertically">
              <i className="icon-logo flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24.002 17.996"
                >
                  <path
                    fill="currentColor"
                    d="M19659-9738v-2h24v2Zm0-8v-2h24v2Zm0-8v-2h24v2Z"
                    transform="translate(-19658.998 9755.998)"
                  />
                </svg>
              </i>
              <Link
                to="/study"
                className="icon icon-current flex-center-horizontally"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27.998 27.999"
                >
                  <g class="a" transform="translate(-17669 12238.001)">
                    <path
                      fill="currentColor"
                      d="M 17692.998046875 -12211.001953125 L 17688.74609375 -12211.001953125 C 17687.09375 -12211.001953125 17685.75 -12212.3466796875 17685.75 -12213.9990234375 L 17685.75 -12218.25 C 17685.75 -12219.904296875 17687.09375 -12221.2509765625 17688.74609375 -12221.2509765625 L 17692.998046875 -12221.2509765625 C 17694.65234375 -12221.2509765625 17695.998046875 -12219.904296875 17695.998046875 -12218.25 L 17695.998046875 -12213.9990234375 C 17695.998046875 -12212.3466796875 17694.65234375 -12211.001953125 17692.998046875 -12211.001953125 Z M 17677.248046875 -12211.001953125 L 17673.001953125 -12211.001953125 C 17671.345703125 -12211.001953125 17670 -12212.3466796875 17670 -12213.9990234375 L 17670 -12218.25 C 17670 -12219.904296875 17671.345703125 -12221.2509765625 17673.001953125 -12221.2509765625 L 17677.248046875 -12221.2509765625 C 17678.904296875 -12221.2509765625 17680.25 -12219.904296875 17680.25 -12218.25 L 17680.25 -12213.9990234375 C 17680.25 -12212.3466796875 17678.904296875 -12211.001953125 17677.248046875 -12211.001953125 Z M 17692.998046875 -12226.7509765625 L 17688.74609375 -12226.7509765625 C 17687.09375 -12226.7509765625 17685.75 -12228.095703125 17685.75 -12229.748046875 L 17685.75 -12233.9990234375 C 17685.75 -12235.654296875 17687.09375 -12237.0009765625 17688.74609375 -12237.0009765625 L 17692.998046875 -12237.0009765625 C 17694.65234375 -12237.0009765625 17695.998046875 -12235.654296875 17695.998046875 -12233.9990234375 L 17695.998046875 -12229.748046875 C 17695.998046875 -12228.095703125 17694.65234375 -12226.7509765625 17692.998046875 -12226.7509765625 Z M 17677.248046875 -12226.7509765625 L 17673.001953125 -12226.7509765625 C 17671.345703125 -12226.7509765625 17670 -12228.095703125 17670 -12229.748046875 L 17670 -12233.9990234375 C 17670 -12235.654296875 17671.345703125 -12237.0009765625 17673.001953125 -12237.0009765625 L 17677.248046875 -12237.0009765625 C 17678.904296875 -12237.0009765625 17680.25 -12235.654296875 17680.25 -12233.9990234375 L 17680.25 -12229.748046875 C 17680.25 -12228.095703125 17678.904296875 -12226.7509765625 17677.248046875 -12226.7509765625 Z"
                    />
                  </g>
                </svg>
              </Link>
              <a href="#!" className="icon flex-center-horizontally">
                <svg
                  version="1.1"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="currentColor"
                    d="M514.9,32h-0.2c-24.1,0.1-144.8,8.8-219.6,48.1c-4,2.1-10.3,2.1-14.4,0C206,40.8,85.3,32.1,61.3,32h-0.2
      C27.4,32,0,58.5,0,91v296.7c0,31.4,25.4,57.3,57.8,58.9c34.8,1.8,122,8.3,181.9,30.4c5.3,2,10.6,3,16.3,3h64c5.6,0,11-1.1,16.3-3
      c59.9-22.1,147.1-28.6,181.9-30.4c32.4-1.6,57.8-27.5,57.8-58.9V91C576,58.5,548.6,32,514.9,32z M272,433c0,8.6-7.1,15.1-15.3,15.1
      c-1.8,0-3.6-0.3-5.4-1c-62.4-23.2-149-30.3-191.9-32.5C44,413.9,32,402,32,387.7V91c0-14.9,13.1-27,29.1-27
      c19.3,0.1,122.5,7.4,192.1,38.3c11.3,5,18.6,15.8,18.7,27.8l0.1,100.3V433z M516.5,414.6c-42.9,2.2-129.5,9.3-191.9,32.5
      c-1.8,0.7-3.6,1-5.4,1c-8.1,0-15.3-6.5-15.3-15.1V230.5l0.1-100.3c0-12.1,7.4-22.8,18.7-27.8C392.4,71.4,495.6,64.1,514.9,64
      c16,0,29.1,12.1,29.1,27v296.7h0C544,402,532,413.9,516.5,414.6z M272,230.5V433c0,8.6-7.1,15.1-15.3,15.1c-1.8,0-3.6-0.3-5.4-1c-62.4-23.2-149-30.3-191.9-32.5C44,413.9,32,402,32,387.7V91
        c0-14.9,13.1-27,29.1-27c19.3,0.1,122.5,7.4,192.1,38.3c11.3,5,18.6,15.8,18.7,27.8L272,230.5z"
                  />
                </svg>
              </a>
              <a href="#!" className="icon flex-center-horizontally">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="sticky-note"
                  className="svg-inline--fa fa-sticky-note fa-w-14"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-120.569 95.196a15.89 15.89 0 0 1-7.431 4.195v-95.509h95.509a15.88 15.88 0 0 1-4.195 7.431l-83.883 83.883zM416 80v239.988H312c-13.255 0-24 10.745-24 24v104H48c-8.837 0-16-7.163-16-16V80c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16z"
                  />
                </svg>
              </a>

              <p
                class="icon flex-center-horizontally"
                onClick={() => onLogOut()}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="sign-out-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                  />
                </svg>
              </p>
            </div>
          </aside>
        </div>
      ) : (
        <aside className="flex aside">
          <div className="flex-vertically">
            <i className="icon-logo flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24.002 17.996"
              >
                <path
                  fill="currentColor"
                  d="M19659-9738v-2h24v2Zm0-8v-2h24v2Zm0-8v-2h24v2Z"
                  transform="translate(-19658.998 9755.998)"
                />
              </svg>
            </i>
            <Link
              to="/study"
              className="icon icon-current flex-center-horizontally"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 27.998 27.999"
              >
                <g class="a" transform="translate(-17669 12238.001)">
                  <path
                    fill="currentColor"
                    d="M 17692.998046875 -12211.001953125 L 17688.74609375 -12211.001953125 C 17687.09375 -12211.001953125 17685.75 -12212.3466796875 17685.75 -12213.9990234375 L 17685.75 -12218.25 C 17685.75 -12219.904296875 17687.09375 -12221.2509765625 17688.74609375 -12221.2509765625 L 17692.998046875 -12221.2509765625 C 17694.65234375 -12221.2509765625 17695.998046875 -12219.904296875 17695.998046875 -12218.25 L 17695.998046875 -12213.9990234375 C 17695.998046875 -12212.3466796875 17694.65234375 -12211.001953125 17692.998046875 -12211.001953125 Z M 17677.248046875 -12211.001953125 L 17673.001953125 -12211.001953125 C 17671.345703125 -12211.001953125 17670 -12212.3466796875 17670 -12213.9990234375 L 17670 -12218.25 C 17670 -12219.904296875 17671.345703125 -12221.2509765625 17673.001953125 -12221.2509765625 L 17677.248046875 -12221.2509765625 C 17678.904296875 -12221.2509765625 17680.25 -12219.904296875 17680.25 -12218.25 L 17680.25 -12213.9990234375 C 17680.25 -12212.3466796875 17678.904296875 -12211.001953125 17677.248046875 -12211.001953125 Z M 17692.998046875 -12226.7509765625 L 17688.74609375 -12226.7509765625 C 17687.09375 -12226.7509765625 17685.75 -12228.095703125 17685.75 -12229.748046875 L 17685.75 -12233.9990234375 C 17685.75 -12235.654296875 17687.09375 -12237.0009765625 17688.74609375 -12237.0009765625 L 17692.998046875 -12237.0009765625 C 17694.65234375 -12237.0009765625 17695.998046875 -12235.654296875 17695.998046875 -12233.9990234375 L 17695.998046875 -12229.748046875 C 17695.998046875 -12228.095703125 17694.65234375 -12226.7509765625 17692.998046875 -12226.7509765625 Z M 17677.248046875 -12226.7509765625 L 17673.001953125 -12226.7509765625 C 17671.345703125 -12226.7509765625 17670 -12228.095703125 17670 -12229.748046875 L 17670 -12233.9990234375 C 17670 -12235.654296875 17671.345703125 -12237.0009765625 17673.001953125 -12237.0009765625 L 17677.248046875 -12237.0009765625 C 17678.904296875 -12237.0009765625 17680.25 -12235.654296875 17680.25 -12233.9990234375 L 17680.25 -12229.748046875 C 17680.25 -12228.095703125 17678.904296875 -12226.7509765625 17677.248046875 -12226.7509765625 Z"
                  />
                </g>
              </svg>
            </Link>
            <a href="#!" className="icon flex-center-horizontally">
              <svg
                version="1.1"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M514.9,32h-0.2c-24.1,0.1-144.8,8.8-219.6,48.1c-4,2.1-10.3,2.1-14.4,0C206,40.8,85.3,32.1,61.3,32h-0.2
        C27.4,32,0,58.5,0,91v296.7c0,31.4,25.4,57.3,57.8,58.9c34.8,1.8,122,8.3,181.9,30.4c5.3,2,10.6,3,16.3,3h64c5.6,0,11-1.1,16.3-3
        c59.9-22.1,147.1-28.6,181.9-30.4c32.4-1.6,57.8-27.5,57.8-58.9V91C576,58.5,548.6,32,514.9,32z M272,433c0,8.6-7.1,15.1-15.3,15.1
        c-1.8,0-3.6-0.3-5.4-1c-62.4-23.2-149-30.3-191.9-32.5C44,413.9,32,402,32,387.7V91c0-14.9,13.1-27,29.1-27
        c19.3,0.1,122.5,7.4,192.1,38.3c11.3,5,18.6,15.8,18.7,27.8l0.1,100.3V433z M516.5,414.6c-42.9,2.2-129.5,9.3-191.9,32.5
        c-1.8,0.7-3.6,1-5.4,1c-8.1,0-15.3-6.5-15.3-15.1V230.5l0.1-100.3c0-12.1,7.4-22.8,18.7-27.8C392.4,71.4,495.6,64.1,514.9,64
        c16,0,29.1,12.1,29.1,27v296.7h0C544,402,532,413.9,516.5,414.6z M272,230.5V433c0,8.6-7.1,15.1-15.3,15.1c-1.8,0-3.6-0.3-5.4-1c-62.4-23.2-149-30.3-191.9-32.5C44,413.9,32,402,32,387.7V91
          c0-14.9,13.1-27,29.1-27c19.3,0.1,122.5,7.4,192.1,38.3c11.3,5,18.6,15.8,18.7,27.8L272,230.5z"
                />
              </svg>
            </a>
            <a href="#!" className="icon flex-center-horizontally">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fal"
                data-icon="sticky-note"
                className="svg-inline--fa fa-sticky-note fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M448 348.106V80c0-26.51-21.49-48-48-48H48C21.49 32 0 53.49 0 80v351.988c0 26.51 21.49 48 48 48h268.118a48 48 0 0 0 33.941-14.059l83.882-83.882A48 48 0 0 0 448 348.106zm-120.569 95.196a15.89 15.89 0 0 1-7.431 4.195v-95.509h95.509a15.88 15.88 0 0 1-4.195 7.431l-83.883 83.883zM416 80v239.988H312c-13.255 0-24 10.745-24 24v104H48c-8.837 0-16-7.163-16-16V80c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16z"
                />
              </svg>
            </a>

            <p class="icon flex-center-horizontally" onClick={() => onLogOut()}>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="sign-out-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                />
              </svg>
            </p>
          </div>
        </aside>
      )}
    </Fragment>
  );
};

export default connect(
  null,
  { logOut }
)(Sidenav);
