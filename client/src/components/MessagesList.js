impoer React from 'react'

export default function MessagesList({msg}) {
  // const attr = msg.user_id === user._id ? `my` : 'm'
  // let d = msg.data.replace(/T/g,' ').slice(0, -8)

  return (
    <section className={`${attr}-wrap`}>
      {/* <img src={msg.user_avatar} alt={msg.user_avatar} /> */}
      <span className={`${attr}-arrow`}></span>
      <article className={`${attr}-wrap-msg`}>
        <div className={`${attr}-time`}>
          <p>{msg.user_name}</p>
          <p>{d}</p>
        </div>
        <div className={`${attr}-msg`}>
          <p>{msg.text}</p>
        </div>
      </article>
    </section>
  )
}