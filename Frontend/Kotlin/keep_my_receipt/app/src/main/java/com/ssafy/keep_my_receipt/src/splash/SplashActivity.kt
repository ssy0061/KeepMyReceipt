package com.ssafy.keep_my_receipt.src.splash

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import com.ssafy.keep_my_receipt.R
import com.ssafy.keep_my_receipt.config.BaseActivity
import com.ssafy.keep_my_receipt.databinding.ActivitySplashBinding

class SplashActivity : BaseActivity<ActivitySplashBinding>(R.layout.activity_splash) {
    private val DELAY = 1000 // 원하는 값으로 설정

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        Handler(Looper.getMainLooper()).postDelayed({
            //startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }, DELAY.toLong())
    }
}