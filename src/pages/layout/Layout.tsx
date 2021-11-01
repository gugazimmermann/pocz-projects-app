import {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { DateTime } from 'luxon';
import { WARNING_TYPES } from '../../libs';
import { AlertInterface, Alert, Callout } from '../../components';
import { PlacesServices, ProfilesServices } from '../../services';
import { IProfile } from '../../interfaces/profiles';
import { Nav, Menu } from './components';

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
  const [profile, setProfile] = useState({} as IProfile);
  const [places, setPlaces] = useState<number>(0);

  function subscriptionEndDate(createdAt: string, frequency: number) {
    const subsCreatedAt = DateTime.fromISO(createdAt).plus({ days: frequency });
    const finish = subsCreatedAt.diff(DateTime.now(), ['days']);
    return Math.ceil(finish.toObject().days as number);
  }

  function finishIn(days: number): string {
    if (days === 0) {
      return 'Hoje';
    }
    if (days > 1) {
      return `em ${days} dias`;
    }
    return `em ${days} dia`;
  }

  function freePlanMsg(p: IProfile) {
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
        message: `${p.subscription.reason} termina ${finishIn(days)}.`,
        type: days > 3 ? WARNING_TYPES.NONE : WARNING_TYPES.WARNING,
      });
    }
  }

  async function whoIAm() {
    try {
      const data = (await ProfilesServices.getOne()) as IProfile;
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
              title="Complete o(s) dado(s) abaixo para liberar o sistema."
            />
          )}
          {!profile.zip && (
            <Callout
              type={WARNING_TYPES.ERROR}
              title="Seu Perfil está"
              emphasis="Incompleto"
              content={`Acesse seu Perfil clicando ${
                profile.avatar && 'em sua foto'
              } no canto superior direito.`}
            />
          )}
          {places === 0 && (
            <Callout
              type={WARNING_TYPES.WARNING}
              title="Nenhum Escritório Cadastrado"
              content="Acesse Escritórios clicando no menu ao lateral."
            />
          )}
          {profile.zip
            && Children.map(children, (child) => cloneElement(child as ReactElement, {
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
