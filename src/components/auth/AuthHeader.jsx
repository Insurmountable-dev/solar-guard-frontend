import {Sun,ShieldCheck} from "lucide-react";

export default function AuthHeader () {

    return (

          <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center px-6 py-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
                            <Sun className="h-5 w-5 text-white"/>
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900">Solar Guard</h1>
                            <p className="text-xs text-slate-500"> System Sizing & Assessment</p>
                        </div>

                    </div>

                </div>

          </header>

    )


}