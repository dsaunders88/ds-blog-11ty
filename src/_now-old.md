---
---

## Currently Reading

<div class="grid grid-cols-1 pr-12 md:pr-0 sm:grid-cols-2 lg:grid-cols-3 gap-10">
{% for book in airtableReadingApp %}
    {% set imageSrc = book.fields.fldEtqJkG0cSKP8dK[0].url %}
    {% set imageAlt = book.fields.fldKlpKfwoCqCJbVM[0] %}
    {% if book.fields.fld9dnT2caLS69tcb[0] %}
        {% set bookLink = book.fields.fld9dnT2caLS69tcb[0] %}
    {% else %}
        {% set bookLink = "#" %}
    {% endif %}
  <div class="space-y-2">
    <a href={{ bookLink }} target="_blank" class="space-y-4 group !text-inherit !no-underline hover:!underline hover:!text-rose-600 dark:hover:!text-rose-400 transition-colors">
        <div class="aspect-[6/9] flex items-center justify-center overflow-hidden [&>*]:object-cover [&>*]:w-full [&>*]:h-full group-hover:-translate-y-2 transition-transform">
            {% inlineImage imageSrc, imageAlt, "100vw" %}
        </div>
        <div class="leading-tight text-lg"><strong>{{ book.fields.fldKlpKfwoCqCJbVM[0] }}</strong></div>
    </a>
    <div>
        <div class="text-base">{{ book.fields.fldC7XcQ4urRb4fQV[0] }}</div>
        <div class="text-sm opacity-75"><em>Reading for {{ book.fields.fld1sg0p9VvabKQDP }} weeks</em></div>
    </div>
  </div>

{% endfor %}

</div>
