import {
  ReactNode,
  useState,
  useEffect,
  Children,
  cloneElement,
  ReactElement,
} from 'react';
import { DateTime } from 'luxon';
import { AlertInterface, Alert, Callout } from '@components';
import { IProfiles } from '@interfaces';
import { Lang } from '@lang';
import { WARNING_TYPES } from '@libs';
import { ProfilesServices, PlacesServices } from '@services';
import { Menu, Nav } from './components';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showAlert, setShowAlert] = useState<AlertInterface>({
    show: false,
    message: '',
    type: WARNING_TYPES.NONE,
    time: 3000,
  });
  const [menuOpen, setMenuOpen] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profile, setProfile] = useState({} as IProfiles);
  const [places, setPlaces] = useState<number>(0);

  function subscriptionEndDate(createdAt: string, frequency: number) {
    const subsCreatedAt = DateTime.fromISO(createdAt).plus({ days: frequency });
    const finish = subsCreatedAt.diff(DateTime.now(), ['days']);
    return Math.ceil(finish.toObject().days as number);
  }

  function finishIn(days: number): string {
    if (days === 0) return Lang.Layout.Today;
    if (days > 1) return `${Lang.Layout.In} ${days} ${Lang.Layout.Days}`;
    return `${Lang.Layout.In} ${days} ${Lang.Layout.Day}`;
  }

  function freePlanMsg(p: IProfiles) {
    if (
      p.subscription
      && p.subscription.planId === process.env.REACT_APP_FREE_PLAN
    ) {
      const days = subscriptionEndDate(
        p.subscription.createdAt,
        p.subscription.frequency as number,
      );
      setShowAlert({
        show: true,
        message: `${p.subscription.reason} ${Lang.Layout.Finish} ${finishIn(
          days,
        )}.`,
        type: days > 3 ? WARNING_TYPES.NONE : WARNING_TYPES.WARNING,
      });
    }
  }

  async function whoIAm() {
    try {
      const data = (await ProfilesServices.getOne()) as IProfiles;
      setProfile(data);
      freePlanMsg(data);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message,
        type: WARNING_TYPES.ERROR,
      });
    }
  }

  async function countPlaces() {
    try {
      const c = (await PlacesServices.count()) as number;
      setPlaces(c);
    } catch (err: any) {
      setShowAlert({
        show: true,
        message: err.message,
        type: WARNING_TYPES.ERROR,
      });
    }
  }

  const seeIncompleteProfile = (avatarOrPhoto: string): string => {
    const langText = Lang.Layout.IncompleteProfile.split('*');
    return `${langText[0]}${avatarOrPhoto ? Lang.Layout.IncompleteProfileAvatar : Lang.Layout.IncompleteProfileInitial}${langText[1]}`;
  };

  useEffect(() => {
    const { innerWidth: width } = window;
    if (width <= 640) setMenuOpen(false);
    whoIAm();
    countPlaces();
  }, []);

  return (
    <div className="flex h-screen antialiased text-gray-900 bg-gray-100">
      <Menu
        profile={profile}
        places={places}
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden overflow-y-auto">
        <Nav
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setNavOpen={setNavOpen}
          navOpen={navOpen}
          setNotificationOpen={setNotificationOpen}
          notificationOpen={notificationOpen}
          profile={profile}
          places={places}
        />
        {/* md:max-w-screen-lg */}
        <main className="h-full bg-gray-50">
          {showAlert.show && <Alert alert={showAlert} />}
          {(!profile.zip || places === 0) && (
            <Callout
              type={WARNING_TYPES.NONE}
              title={Lang.Layout.IncompleteData}
            />
          )}
          {!profile.zip && (
            <Callout
              type={WARNING_TYPES.ERROR}
              title={Lang.Layout.IncompleteProfileTitle}
              emphasis={Lang.Layout.IncompleteProfileEmphasis}
              content={seeIncompleteProfile(profile.avatar)}
            />
          )}
          {places === 0 && (
            <Callout
              type={WARNING_TYPES.WARNING}
              title={Lang.Layout.NoPlaceTitle}
              content={Lang.Layout.NoPlace}
            />
          )}
          {Children.map(children, (child) => cloneElement(child as ReactElement, {
            profile,
            setProfile,
            places,
            setPlaces,
          }))}
        </main>
      </div>
    </div>
  );
}

export default Layout;
