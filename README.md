# typescriptでchart.jsの練習

## 大事なこと
tooltip:{   
    callbacks:{  
        label:(context)=>{  
            return `${context.dataset.label}: ${context.formattedValue}個`  
        }  
    }  
}  
tooltip.callbacks.labelに関数を組むことでホバーした時の情報を変更できる  
backgroundColorに色の文字列を渡すと単色、配列を渡すと各データに対応した色になる   
ChartConfigは基本的にtype,data,optionの3つを定める　　
書き方は公式ドキュメントを参考にしたらいいから、グラフを描く流れだけ覚える  
