
const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    function toggleExpanded() {
        setIsExpanded(prevIsExpanded => !prevIsExpanded)
    }

    function getTxtToShow() {
        if (txt.length <= length) {
            return txt;
        }
        return isExpanded ? txt : txt.substring(0, length) + '...'
    }

    if (!txt) return <span></span>
    
    return (
        <section className="long-txt">
            <span>{getTxtToShow()}</span>
            {'\u2003'} {/*space betweeh the txt and the btn*/}
            {(txt.length > length) && 
                <button className="expand-btn" onClick={toggleExpanded}>
                    {isExpanded ? 'Show Less' : ' Show More'}
                </button>
            }
        </section>
    )
}