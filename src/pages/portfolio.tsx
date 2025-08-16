import { CONFIG } from 'src/config-global';
import  PortfolioView  from 'src/sections/portfolio/view/portfolio-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Sign in - ${CONFIG.appName}`}</title>

      <PortfolioView />
    </>
  );
}
