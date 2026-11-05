import { Search, X, ChevronLeft } from 'lucide-react';
import Button from '../../common/Button';
import InputField from '../../common/InputField.jsx';
import useNavigation from '../../../contexts/NavigationProvider';


export default function ApplianceSearchHeader ({result, query, setQuery}) {


    const {setIsSearching} = useNavigation();

    return (

      <header className="sticky top-0 z-20 border-b border-emerald-100/80 bg-white/95 shadow-sm shadow-slate-200/50 backdrop-blur-xl">


          {/* soft emerald wash behind the title */}
          <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-100/80 via-emerald-50/50 to-transparent"
          />

          <div className="relative mx-auto w-full max-w-6xl px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-7">

              {/* Title row */}
              <div className="flex items-start gap-3 sm:gap-5">

                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsSearching(false)}
                      aria-label="Go back"
                      classname="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-white text-slate-700 shadow-md transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:h-14 sm:w-14"
                  >
                      <ChevronLeft size={30} strokeWidth={2.5} />
                  </Button>

                  <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">
                              <div className="mb-1 flex items-center gap-2">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                  <p className="text-[20px] font-extrabold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs">
                                      Solar Guard Library
                                  </p>
                              </div>

                              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                  Find your appliance
                              </h1>

                              <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                                  Search by name or local name, like "pasi", "posho mill" or "friji".
                              </p>
                          </div>

                          <span className="hidden shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-xs font-bold text-emerald-700 shadow-sm sm:inline-block">
                              {result.length} appliances
                          </span>

                      </div>

                  </div>

              </div>

              {/* Search row */}
              <div className="mt-4 flex items-end gap-2.5 sm:mt-6 sm:gap-3">

                  <InputField
                      name="appliance-search"
                      type="text"
                      icon={Search}
                      placeholder="Search appliances..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1"
                      autoFocus
                  />

                  { (query.trim() !== "") && (
                      <Button
                          variant="outline"
                          icon={X}
                          className="shrink-0"
                          onClick={() => {
                              setQuery("");
                          }}
                      >
                          Clear
                      </Button>
                  )}

              </div>


          </div>

      </header>

    )
}