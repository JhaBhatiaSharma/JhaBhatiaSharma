\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ConfigurationFiles/configuration}[2024/12/21 Politecnico SE2 submission]
\ProcessOptions\relax

%--------------------------------------------------------------------------
%	HANDLING THE STYLE OF THE THESIS
%--------------------------------------------------------------------------
\LoadClass[12pt, twoside]{book} % 12 pt font, two-sided book style
\RequirePackage[a4paper, includehead, headheight=0.6cm, inner=3.0cm ,outer=2.0cm, top=2.5cm, bottom=2.5cm]{geometry}

\RequirePackage[bf, font=onehalfspacing]{caption} % caption: FIG in bold, 1.5 line spacing in figure and table captions
\newcommand{\thesisspacing}{\onehalfspacing}

\RequirePackage{xcolor} % Import xcolor for handling colors
\definecolor{magenta}{rgb}{1.0, 0.0, 1.0} % Define magenta color

% Define new command: numbered and un-numbered chapter in Polimi style. 

\let\latexchapter\chapter
%! suppress = MightBreakTexify
\renewcommand{\chapter}{\@ifstar{\polimichapterstar}{\polimichapter}}

\newcommand{\polimichapter}[1]{
    \cleardoublepage % To make sure the previous headers are passed
    \phantomsection % To help hyperref link to the right page
    \latexchapter{#1}
    \renewcommand{\headrulewidth}{0pt} %removing the horizontal line in the header
    \fancyhead[LO, RE]{ \textbf{\textcolor{magenta}\thechapter\hsp\textcolor{magenta}{|   }\hsp \leftmark}}% Header
    \fancyhead[LE, RO]{\thepage}
    \vspace{-1cm}
}

\newcommand{\polimichapterstar}[1]{
    \cleardoublepage % To make sure the previous headers are passed
    \phantomsection % To help hyperref link to the right page
    \latexchapter*{#1}
    \renewcommand{\headrulewidth}{0pt} %removing the horizontal line in the header
    \addcontentsline{toc}{chapter}{#1} % Also adds the chapter name to the Contents
    \fancyhead[LO, RE]{ \bfseries \textcolor{magenta}{|   } #1} % Header \textbf{\leftmark} \hspace{1mm}}
    \fancyhead[LE, RO]{\thepage}
    \vspace{-1cm}
}

% Define new command: start preamble
\newcommand{\startpreamble}{
    \pagestyle{fancy} % Change the header style
    \fancyhf{}% Clear header and footer
    \renewcommand{\chaptermark}[1]{\markboth{##1}{}} % Getting the chapter name right
    \rhead{\thepage} % Page number at the right of the header
    \frontmatter % Use roman page numbering style (i, ii, iii, iv...) for the preamble pages
    \thesisspacing % Double or single spacing
}

%------------------------------------------------------------------------
%	BUILDING THE TITLE PAGE
%------------------------------------------------------------------------

% Define blank background for title page
\newcommand\BackgroundPicTR{% Removing circular patterns
    \null % Placeholder or no background
}

% Define blank background for empty pages
\newcommand\BackgroundPic{% Removing circular patterns
    \null % Placeholder or no background
}

\RequirePackage{xkeyval} % Handling keyword options.

% Define keys for title pages
\newif\if@cosupervisorexist\@cosupervisorexistfalse
\define@key[OIST]{title}{title}{\def\thesistitle{#1}}
\define@key[OIST]{title}{name1}{\def\nameA{#1}}
\define@key[OIST]{title}{name2}{\def\nameB{#1}}
\define@key[OIST]{title}{name3}{\def\nameC{#1}}
\define@key[OIST]{title}{academicyear}{\def\academicyear{#1}}

\providecommand{\puttitle}{}
\renewcommand{\puttitle}[1]{
    \@puttitle{}{#1}
}

\providecommand{\@puttitle}{}
\renewcommand{\@puttitle}[2]{%
    \setkeys[OIST]{title}{#2}

    \begin{titlepage}
        \AddToShipoutPicture*{\BackgroundPicTR} % No pattern applied
        \vfill
        \begin{minipage}{0.95\textwidth}
            \includegraphics[trim={1.2cm 0 0 0},clip, width=0.7\textwidth]{JhaBhatiaSharma/Images/PolimiLogo.png}
            \hfill
            \\
            \vspace{2.5cm}
            \\
            {{\color{magenta} \singlespacing \huge \bfseries \thesistitle \par}}
            \vspace{1.5cm}
            {\color{black} \Large {Author(s):} \bfseries{\nameA}} \\ \\
            \vspace{0.51cm}
            {\color{black} \hspace{6.3em} \Large \bfseries{\nameB}} \\
            \vspace{0.51cm}
            {\color{black} \hspace{6.3em} \Large \bfseries{\nameC}} \\
        \end{minipage}
        \\
        \vspace*{\fill}
        \\
        \begin{minipage}{0.85\textwidth}
            \normalsize{
                Academic Year: {\academicyear}
            }
        \end{minipage}
    \end{titlepage}
}

\newcommand\blankpage{%
    \null
    \AddToShipoutPicture*{\BackgroundPic} % No pattern applied
    \thispagestyle{empty}%
    \addtocounter{page}{-1}%
    \newpage
}
