package com.ssafy.keep_my_receipt.src.main
import android.os.Bundle
import android.util.Log
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.navigation.NavigationBarView
import com.ssafy.keep_my_receipt.R
import com.ssafy.keep_my_receipt.config.BaseActivity
import com.ssafy.keep_my_receipt.databinding.ActivityMainBinding
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    val TAG: String = "로그"
    override fun onCreate(savedInstance: Bundle?) {
        super.onCreate(savedInstance)
        setContentView(R.layout.activity_main)
        val myWebView: WebView = findViewById(R.id.webview)

        myWebView.settings.javaScriptEnabled = true // 자바스크립트 허용
        myWebView.webViewClient = WebViewClient() // 웹뷰에서 새 창이 뜨지 않도록 방지하는 구문 1
        myWebView.webChromeClient = WebChromeClient() // 웹뷰에서 새 창이 뜨지 않도록 방지하는 구문 1
        myWebView.loadUrl("https://www.daum.net")

        //바텀 네비개이션 뷰 가져오기
        bottomNavigationView.setOnItemSelectedListener {
            when(it.itemId){
                R.id.book-> {
                    Log.d(TAG,"장부 클릭")
                    myWebView.loadUrl("https://www.google.com")
                    return@setOnItemSelectedListener true
                }

                R.id.chart-> {
                    Log.d(TAG,"차트 클릭")
                    myWebView.loadUrl("https://www.example.com")
                    return@setOnItemSelectedListener true
                }

                R.id.add-> {
                    Log.d(TAG,"거래내역 추가 클릭")
                    myWebView.loadUrl("https://www.daum.net")
                    return@setOnItemSelectedListener true
                }
                R.id.members-> {
                    Log.d(TAG,"멤버관리 클릭")
                    return@setOnItemSelectedListener true
                }
                R.id.report-> {
                    Log.d(TAG,"보고서 클릭")
                    return@setOnItemSelectedListener true
                }
            }
            false
        }
    }
    // 백버튼 누를 때 로직 수행
    override fun onBackPressed() {
        if(webview.canGoBack()) {
            //웹사이트에서 뒤로 갈 페이지가 존재한다면,
            webview.goBack() // 웹사이트 뒤로가기
        }else
        {
            super.onBackPressed()
        }
    }
}