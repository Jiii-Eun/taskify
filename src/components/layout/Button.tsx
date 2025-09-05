"use client"; 

interface MyButtonProps{
    text: string;
    onClick: () => void;
    className?: string;
    color?: "buttonBasic" | "buttonBlue" | "buttonGrey";
}

/*기본은 primary며, primary는 흰바탕, secondary는 보라배경, danger는 회색배경입니다*/
export default function MyButton({text, onClick, className="", color = "buttonBasic"}: MyButtonProps){
    const colorClasses = {
        buttonBasic: "bg-[#ffffff] border border-[#d9d9d9]" ,
        buttonBlue: "bg-[#4276EC] border border-[#4276EC]",
        buttonGrey: "bg-[#9FA6B2] border border-[#9FA6B2]",
    };

    return(
        <button type="button" onClick={onClick}
        className={`text-sm rounded-lg cursor-pointer ${className} ${colorClasses[color]}`}>{text}</button>
    )
}